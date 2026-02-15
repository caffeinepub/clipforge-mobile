import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from './features/theme/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';
import HomeScreen from './screens/HomeScreen';
import TemplatesScreen from './screens/TemplatesScreen';
import CreateScreen from './screens/CreateScreen';
import ProjectsScreen from './screens/ProjectsScreen';
import ProfileScreen from './screens/ProfileScreen';
import VideoEditorScreen from './video-editor/VideoEditorScreen';
import PhotoEditorScreen from './photo-editor/PhotoEditorScreen';
import BottomTabBar from './components/common/BottomTabBar';
import MajorUpdatePrompt from './components/common/MajorUpdatePrompt';
import OfflineBanner from './components/common/OfflineBanner';
import UserProfileGate from './features/auth/UserProfileGate';

function Layout() {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <OfflineBanner />
      <MajorUpdatePrompt />
      <UserProfileGate />
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
      <BottomTabBar />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: Layout,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomeScreen,
});

const templatesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/templates',
  component: TemplatesScreen,
});

const createRoute_ = createRoute({
  getParentRoute: () => rootRoute,
  path: '/create',
  component: CreateScreen,
});

const projectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/projects',
  component: ProjectsScreen,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: ProfileScreen,
});

const videoEditorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/video-editor/$projectId',
  component: VideoEditorScreen,
});

const photoEditorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/photo-editor/$projectId',
  component: PhotoEditorScreen,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  templatesRoute,
  createRoute_,
  projectsRoute,
  profileRoute,
  videoEditorRoute,
  photoEditorRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
