import CreateTaskDialog from "@/components/task/create-task";
import TaskColumn from "@/components/task/task-column";
import BackButton from "@/components/ui/back-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProjectDetails } from "@/hooks/use-project";
import { getProjectProgress } from "@/lib";
import type {
  Project,
  ProjectMemberRole,
  Task,
  TaskStatus,
  User,
} from "@/types";
import { TabsContent } from "@radix-ui/react-tabs";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

const ProjectDetails = () => {
  const [isCreateTask, setIsCreateTask] = useState(false);
  const [taskFilter, setTaskFilter] = useState<TaskStatus | "All">("All");

  const { projectId, workspaceId } = useParams();

  const navigate = useNavigate();

  const { data, isLoading } = useProjectDetails(projectId!) as {
    data: {
      tasks: Task[];
      project: Project;
    };
    isLoading: boolean;
  };

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );

  const { project, tasks } = data;
  const projectProgress = getProjectProgress(tasks);

  const handleTaskClick = (taskId: string) => {
    navigate(`/workspaces/${workspaceId}/projects/${projectId}/task/${taskId}`);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="gap-1 flex">
          <BackButton />

          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl md:text-2xl font-bold">{project.title}</h1>
            </div>
            {project.description && (
              <p className="text-sm text-gray-500">{project.description}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2 min-w-32">
            <div className="text-sm text-muted-foreground">Progress:</div>
            <div className="flex-1">
              <Progress value={projectProgress} className="h-2" />
            </div>
            <span className="text-sm text-muted-foreground">
              {projectProgress}%
            </span>
          </div>

          <Button
            onClick={() => setIsCreateTask(true)}
            variant={"outline"}
            className="text-primary hover:text-primary/80"
          >
            Add Task
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Tabs className="w-full" defaultValue="all">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <TabsList>
              <TabsTrigger value="all" onClick={() => setTaskFilter("All")}>
                All Tasks
              </TabsTrigger>
              <TabsTrigger value="todo" onClick={() => setTaskFilter("To Do")}>
                To Do
              </TabsTrigger>
              <TabsTrigger
                value="in-progress"
                onClick={() => setTaskFilter("In Progress")}
              >
                In Progress
              </TabsTrigger>
              <TabsTrigger value="done" onClick={() => setTaskFilter("Done")}>
                Done
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center text-sm">
              <span className="text-muted-foreground">Status:</span>
              <div>
                <Badge variant={"outline"} className="bg-background">
                  {tasks.filter((task) => task.status === "To Do").length} To Do
                </Badge>

                <Badge variant={"outline"} className="bg-background">
                  {tasks.filter((task) => task.status === "In Progress").length}{" "}
                  In Progress
                </Badge>

                <Badge variant={"outline"} className="bg-background">
                  {tasks.filter((task) => task.status === "Done").length} Done
                </Badge>
              </div>
            </div>
          </div>

          <TabsContent value="all" className="m-0">
            <div className="grid grid-cols-3 gap-4">
              <TaskColumn
                title="To Do"
                tasks={tasks.filter((task) => task.status === "To Do")}
                onTaskClick={handleTaskClick}
              />
              <TaskColumn
                title="In Progress"
                tasks={tasks.filter((task) => task.status === "In Progress")}
                onTaskClick={handleTaskClick}
              />
              <TaskColumn
                title="Done"
                tasks={tasks.filter((task) => task.status === "Done")}
                onTaskClick={handleTaskClick}
              />
            </div>
          </TabsContent>

          <TabsContent value="todo" className="m-0">
            <div className="grid grid-cols-1 gap-4">
              <TaskColumn
                title="To Do"
                tasks={tasks.filter((task) => task.status === "To Do")}
                onTaskClick={handleTaskClick}
                isFullWidth
              />
            </div>
          </TabsContent>

          <TabsContent value="in-progress" className="m-0">
            <div className="grid grid-cols-1 gap-4">
              <TaskColumn
                title="In Progress"
                tasks={tasks.filter((task) => task.status === "In Progress")}
                onTaskClick={handleTaskClick}
                isFullWidth
              />
            </div>
          </TabsContent>

          <TabsContent value="done" className="m-0">
            <div className="grid grid-cols-1 gap-4">
              <TaskColumn
                title="Done"
                tasks={tasks.filter((task) => task.status === "Done")}
                onTaskClick={handleTaskClick}
                isFullWidth
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <CreateTaskDialog
        open={isCreateTask}
        onOpenChange={setIsCreateTask}
        projectId={projectId!}
        projectMembers={project.members as any}
      />
    </div>
  );
};

export default ProjectDetails;
