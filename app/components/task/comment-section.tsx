import type {ProjectMemberRole, User} from "@/types";
import React, {useState} from "react";
import {ScrollArea} from "../ui/scroll-area";
import {Separator} from "../ui/separator";
import {Textarea} from "../ui/textarea";
import {Button} from "../ui/button";
import {useAddComment, useGetAllComments} from "@/hooks/use-task";
import {toast} from "sonner";
import type {Comment} from "@/types/index";
import {Avatar, AvatarFallback, AvatarImage} from "../ui/avatar";
import {formatDistanceToNow} from "date-fns";

interface Props {
  taskId: string;
  members: {
    user: User;
    role: ProjectMemberRole;
  }[];
}

const CommentSection: React.FC<Props> = ({taskId, members}) => {
  const [newComment, setNewComment] = useState("");

  const {mutate: addComment, isPending} = useAddComment();
  const {data: allComments} = useGetAllComments(taskId) as {
    data: Comment[];
  };

  console.log("Comment Data=>", allComments);
  console.log("Comment Data=>", allComments);

  const handleAddComment = () => {
    addComment(
      {taskId, comment: newComment},
      {
        onSuccess: () => toast.success("Comment is added"),
        onError: (error) => toast.error("" + error),
      }
    );
    setNewComment("");
  };
  return (
    <div className="bg-card rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-medium mb-4">Comments: </h3>

      <ScrollArea className="h-[300px] mb-4">
        {allComments && allComments.length ? (
          allComments.map((comment) => (
            <div key={comment._id} className="flex gap-4">
              <Avatar className="size-8">
                <AvatarImage src={comment.author.profilePicture} />
                <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-sm">
                    {comment.author.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(comment.createdAt, {addSuffix: true})}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground">{comment.text}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground"> No Comment yet</p>
        )}
      </ScrollArea>

      <Separator className="my-4" />

      <div className="mt-4">
        <Textarea
          placeholder="Add a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />

        <div className="flex justify-end mt-4">
          <Button
            className=""
            onClick={handleAddComment}
            disabled={!newComment.trim() || isPending}
          >
            Post Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
