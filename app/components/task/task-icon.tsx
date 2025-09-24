import type {Action} from "@/types";
import {
  PlusCircle,
  Edit,
  Trash2,
  CheckCircle,
  UserPlus,
  UserMinus,
  FilePlus,
  FolderPlus,
  FolderOpen,
  Archive,
  RefreshCw,
  Users,
  LogIn,
  LogOut,
  Crown,
  Mail,
  MessageSquarePlus,
  MessageSquare,
  Paperclip,
  Tag,
  AtSign,
} from "lucide-react";
import type {LucideIcon} from "lucide-react";

export function getActionIcon(action: Action): LucideIcon {
  switch (action) {
    // Task
    case "created_task":
      return PlusCircle;
    case "updated_task":
      return Edit;
    case "deleted_task":
      return Trash2;
    case "completed_task":
      return CheckCircle;
    case "assigned_task":
      return UserPlus;
    case "unassigned_task":
      return UserMinus;

    // Subtask
    case "created_subtask":
      return FilePlus;
    case "updated_subtask":
      return Edit;
    case "deleted_subtask":
      return Trash2;
    case "completed_subtask":
      return CheckCircle;
    case "assigned_subtask":
      return UserPlus;
    case "unassigned_subtask":
      return UserMinus;

    // Project
    case "created_project":
      return FolderPlus;
    case "updated_project":
      return Edit;
    case "deleted_project":
      return Trash2;
    case "archived_project":
      return Archive;
    case "restored_project":
      return RefreshCw;
    case "added_project_member":
      return UserPlus;
    case "removed_project_member":
      return UserMinus;

    // Workspace
    case "created_workspace":
      return FolderPlus;
    case "updated_workspace":
      return Edit;
    case "deleted_workspace":
      return Trash2;
    case "joined_workspace":
      return LogIn;
    case "left_workspace":
      return LogOut;
    case "transferred_workspace_ownership":
      return Crown;
    case "invited_workspace_member":
      return Mail;
    case "removed_workspace_member":
      return UserMinus;

    // Comments
    case "added_comment":
      return MessageSquarePlus;
    case "updated_comment":
      return Edit;
    case "deleted_comment":
      return Trash2;

    // Attachments
    case "added_attachment":
      return Paperclip;
    case "removed_attachment":
      return Trash2;

    // Labels
    case "added_label":
      return Tag;
    case "removed_label":
      return Tag;

    // Members
    case "added_member":
      return UserPlus;
    case "removed_member":
      return UserMinus;

    // Mention
    case "mentioned_user":
      return AtSign;

    default:
      return MessageSquare;
  }
}
