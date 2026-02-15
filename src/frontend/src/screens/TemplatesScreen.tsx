import { useState } from 'react';
import { Video, Image as ImageIcon, Download, Check } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTemplatesList, useTemplateCacheStatus } from '../features/templates/useTemplates';
import { instantiateVideoTemplate, instantiatePhotoTemplate } from '../features/projects/projectInstantiation';
import { cacheTemplate } from '../storage/templatesCache';
import ProBadge from '../components/common/ProBadge';
import UpsellPrompt from '../components/common/UpsellPrompt';
import { useEntitlements } from '../entitlements/useEntitlements';
import { TemplateType, Entitlement } from '../backend';

export default function TemplatesScreen() {
  const navigate = useNavigate();
  const { templates, isLoading } = useTemplatesList();
  const { canUse, isProEnabled } = useEntitlements();
  const [upsellOpen, setUpsellOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState('');

  const videoTemplates = templates.filter((t) => t.templateType === TemplateType.video);
  const photoTemplates = templates.filter((t) => t.templateType === TemplateType.photo);

  const handleUseTemplate = async (template: any) => {
    if (template.entitlement === Entitlement.pro && isProEnabled && !canUse('premium-templates')) {
      setSelectedFeature('Premium templates');
      setUpsellOpen(true);
      return;
    }

    if (template.templateType === TemplateType.video) {
      const projectId = await instantiateVideoTemplate(template.id, template.name);
      navigate({ to: `/video-editor/${projectId}` });
    } else {
      const projectId = await instantiatePhotoTemplate(template.id, template.name);
      navigate({ to: `/photo-editor/${projectId}` });
    }
  };

  const TemplateCard = ({ template }: { template: any }) => {
    const { data: isCached } = useTemplateCacheStatus(template.id);
    const isPro = template.entitlement === Entitlement.pro;

    return (
      <Card className="overflow-hidden hover:border-primary/50 transition-colors">
        <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
          {template.templateType === TemplateType.video ? (
            <Video className="h-12 w-12 text-primary/40" />
          ) : (
            <ImageIcon className="h-12 w-12 text-primary/40" />
          )}
        </div>
        <CardHeader className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-base">{template.name}</CardTitle>
            {isPro && isProEnabled && <ProBadge />}
          </div>
          <CardDescription className="text-sm">{template.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button 
            onClick={() => handleUseTemplate(template)}
            className="w-full"
            size="sm"
          >
            Use Template
          </Button>
          {isCached && (
            <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
              <Check className="h-3 w-3" />
              Available offline
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
          <p className="text-sm text-muted-foreground">Loading templates...</p>
        </div>
      </div>
    );
  }

  if (templates.length === 0) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md">
          <img 
            src="/assets/generated/clipforge-empty-templates.dim_1200x800.png" 
            alt="No templates" 
            className="w-full max-w-xs mx-auto opacity-50"
          />
          <h3 className="text-lg font-semibold">No Templates Yet</h3>
          <p className="text-sm text-muted-foreground">
            Templates will appear here once they're available.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="h-full overflow-y-auto">
        <div className="max-w-screen-xl mx-auto p-4">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Templates</h1>
            <p className="text-muted-foreground">
              Start with a professionally designed template
            </p>
          </div>

          <Tabs defaultValue="video" className="space-y-4">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="video">
                <Video className="h-4 w-4 mr-2" />
                Video ({videoTemplates.length})
              </TabsTrigger>
              <TabsTrigger value="photo">
                <ImageIcon className="h-4 w-4 mr-2" />
                Photo ({photoTemplates.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="video" className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {videoTemplates.map((template) => (
                  <TemplateCard key={template.id} template={template} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="photo" className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {photoTemplates.map((template) => (
                  <TemplateCard key={template.id} template={template} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <UpsellPrompt 
        open={upsellOpen} 
        onOpenChange={setUpsellOpen}
        feature={selectedFeature}
      />
    </>
  );
}
