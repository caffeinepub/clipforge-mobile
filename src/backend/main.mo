import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Order "mo:core/Order";
import VarArray "mo:core/VarArray";
import List "mo:core/List";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Types
  // =====

  module Record {
    public type TemplateType = {
      #video;
      #photo;
    };

    public type Entitlement = {
      #free;
      #pro;
    };

    public type TemplateMetadata = {
      id : Text;
      name : Text;
      description : Text;
      templateType : TemplateType;
      entitlement : Entitlement;
      createdAt : Time.Time;
      modifiedAt : Time.Time;
    };

    public func compare(a : TemplateMetadata, b : TemplateMetadata) : Order.Order {
      Text.compare(a.id, b.id);
    };
  };

  public type UserProfile = {
    name : Text;
    entitlement : Record.Entitlement;
  };

  // State
  // =====

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type TemplateMetadata = Record.TemplateMetadata;
  let templates = Map.empty<Text, TemplateMetadata>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // User Profile API
  // ================

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Template Management API
  // =======================

  // Save a template (admin-only)
  public shared ({ caller }) func saveTemplate(template : TemplateMetadata) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can save templates");
    };
    templates.add(template.id, template);
  };

  // Get a template by ID (public)
  public query ({ caller }) func getTemplate(id : Text) : async ?TemplateMetadata {
    templates.get(id);
  };

  // Get all templates (public)
  public query ({ caller }) func getAllTemplates() : async [TemplateMetadata] {
    templates.values().toArray().sort();
  };

  // Get templates by type (public)
  public query ({ caller }) func getTemplatesByType(templateType : Record.TemplateType) : async [TemplateMetadata] {
    templates.values().toArray().filter(
      func(t) {
        t.templateType == templateType;
      }
    );
  };

  // Get templates by entitlement (public)
  public query ({ caller }) func getTemplatesByEntitlement(entitlement : Record.Entitlement) : async [TemplateMetadata] {
    templates.values().toArray().filter(
      func(t) {
        t.entitlement == entitlement;
      }
    );
  };

  // Delete a template (admin-only)
  public shared ({ caller }) func deleteTemplate(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete templates");
    };
    templates.remove(id);
  };
};
