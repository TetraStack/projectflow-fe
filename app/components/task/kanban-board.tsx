import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Task, TaskStatus } from "@/types";
import React, { useState } from "react";

interface KanbanBoardProps {
  tasks: Task[];
  onTaskClick: (taskId: string) => void;
  onTaskStatusChange?: (taskId: string, newStatus: TaskStatus) => void;
}

interface TaskCardProps {
  task: Task;
  onClick: () => void;
  isDragging?: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick, isDragging }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onClick}
      className={cn(
        "cursor-pointer hover:shadow-md transition-all duration-200 hover:translate-y-1 mb-3",
        (isDragging || isSortableDragging) && "opacity-50 shadow-lg"
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <h3 className="font-medium text-sm line-clamp-2">{task.title}</h3>
          <Badge
            variant="outline"
            className={cn("text-xs", getPriorityColor(task.priority))}
          >
            {task.priority}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {task.description && (
          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
            {task.description}
          </p>
        )}

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Due: {formatDate(task.dueDate)}</span>
          {task.assignees && task.assignees.length > 0 && (
            <div className="flex -space-x-1">
              {task.assignees.slice(0, 2).map((assignee, index) => (
                <div
                  key={index}
                  className="w-5 h-5 rounded-full bg-primary/10 border border-background flex items-center justify-center text-xs"
                >
                  {typeof assignee === "string"
                    ? assignee.charAt(0).toUpperCase()
                    : assignee.name?.charAt(0).toUpperCase() || "?"}
                </div>
              ))}
              {task.assignees.length > 2 && (
                <div className="w-5 h-5 rounded-full bg-muted border border-background flex items-center justify-center text-xs">
                  +{task.assignees.length - 2}
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

interface KanbanColumnProps {
  status: TaskStatus;
  tasks: Task[];
  onTaskClick: (taskId: string) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  status,
  tasks,
  onTaskClick,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: status });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case "To Do":
        return "border-gray-200 bg-gray-50";
      case "In Progress":
        return "border-blue-200 bg-blue-50";
      case "Review":
        return "border-yellow-200 bg-yellow-50";
      case "Done":
        return "border-green-200 bg-green-50";
      default:
        return "border-gray-200 bg-gray-50";
    }
  };

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case "To Do":
        return "📋";
      case "In Progress":
        return "🔄";
      case "Review":
        return "👀";
      case "Done":
        return "✅";
      default:
        return "📋";
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "flex-1 min-h-[500px] p-4 rounded-lg border-2 border-dashed min-w-[280px] max-w-[320px]",
        getStatusColor(status)
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">{getStatusIcon(status)}</span>
          <h2 className="font-semibold text-sm">{status}</h2>
        </div>
        <Badge variant="secondary" className="text-xs">
          {tasks.length}
        </Badge>
      </div>

      <SortableContext
        items={tasks.map((task) => task._id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2">
          {tasks.length === 0 ? (
            <div className="text-center text-sm text-muted-foreground py-8">
              No tasks yet
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onClick={() => onTaskClick(task._id)}
              />
            ))
          )}
        </div>
      </SortableContext>
    </div>
  );
};

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  tasks,
  onTaskClick,
  onTaskStatusChange,
}) => {
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const columns: TaskStatus[] = ["To Do", "In Progress", "Review", "Done"];

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter((task) => task.status === status);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks.find((t) => t._id === active.id);
    setActiveTask(task || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over || !onTaskStatusChange) return;

    const taskId = active.id as string;
    const newStatus = over.id as TaskStatus;

    // Only update if the status actually changed
    const task = tasks.find((t) => t._id === taskId);
    if (task && task.status !== newStatus) {
      onTaskStatusChange(taskId, newStatus);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    // This can be used for more complex drag-over logic if needed
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div className="flex gap-6 overflow-x-auto pb-4 min-h-[600px]">
        {columns.map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            tasks={getTasksByStatus(status)}
            onTaskClick={onTaskClick}
          />
        ))}
      </div>

      <DragOverlay>
        {activeTask ? (
          <TaskCard task={activeTask} onClick={() => {}} isDragging={true} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default KanbanBoard;
