import {Button} from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Loader from "@/components/ui/loader";
import {useGetAllMyTasks} from "@/hooks/use-task";
import type {Task} from "@/types";
import {} from "@radix-ui/react-dropdown-menu";
import React, {useEffect, useState} from "react";
import {Link, useSearchParams} from "react-router";

import {HugeiconsIcon} from "@hugeicons/react";
import {
  FilterEditIcon,
  TickDouble03Icon,
  Clock01FreeIcons,
  SquareArrowUpRightIcon,
} from "@hugeicons/core-free-icons";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle,
  Clock,
  Filter,
  FolderKanban,
  ProjectorIcon,
  RefreshCw,
} from "lucide-react";
import {Checkbox} from "@/components/ui/checkbox";
import {Input} from "@/components/ui/input";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {format} from "date-fns";

interface Props {}

type FilterOption =
  | "all"
  | "todo"
  | "inprogress"
  | "done"
  | "archieved"
  | "high";

const MyTasks: React.FC<Props> = () => {
  const {data: myTasks, isLoading} = useGetAllMyTasks() as {
    data: Task[];
    isLoading: boolean;
  };

  const [searchParams, setSearchParams] = useSearchParams();

  const initialFilter = (searchParams.get("filter") || "all") as FilterOption;
  const initalSort = searchParams.get("sort") || "desc";
  const initalSearch = searchParams.get("search") || "";

  const [filter, setFilter] = useState<FilterOption>(initialFilter);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">(
    initialFilter as "asc" | "desc"
  );
  const [search, setSearch] = useState(initalSearch);

  // console.log("data =====>", myTasks);

  const filteredTasks =
    myTasks?.length > 0
      ? myTasks
          .filter((task) => {
            if (filter === "all") return true;
            if (filter === "todo") return task.status === "To Do";
            if (filter === "inprogress") return task.status === "In Progress";
            if (filter === "done") return task.status === "Done";
            if (filter === "archieved") return task.isArchived === true;
            if (filter === "high") return task.priority === "High";

            return true;
          })
          .filter(
            (task) =>
              task.title.toLocaleLowerCase().includes(search.toLowerCase()) ||
              task.description?.toLowerCase().includes(search.toLowerCase())
          )
      : [];

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (a.dueDate && b.dueDate) {
      return sortDirection === "asc"
        ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        : new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
    }

    return 0;
  });

  useEffect(() => {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });

    params.filter = filter;
    params.sort = sortDirection;
    params.search = search;

    setSearchParams(params, {replace: true});
  }, [filter, sortDirection, search]);
  useEffect(() => {
    const urlFilter = searchParams.get("filter") || "all";
    const urlSort = searchParams.get("sort") || "desc";
    const urlSearch = searchParams.get("search") || "";

    if (urlFilter !== filter) setFilter(urlFilter as FilterOption);
    if (urlSort !== sortDirection)
      setSortDirection(urlSort === "asc" ? "asc" : "desc");
    if (urlSearch !== search) setSearch(urlSearch);
  }, [searchParams]);

  const todoTasks = sortedTasks.filter((task) => task.status === "To Do");
  const inProgressTasks = sortedTasks.filter(
    (task) => task.status === "In Progress"
  );
  const doneTasks = sortedTasks.filter((task) => task.status === "Done");

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start md:items-center justify-between">
        <h1 className="text-2xl font-bold">My Tasks</h1>

        <div className="flex flex-col items-start md:flex-row md:items-center gap-2">
          <Button
            variant={"outline"}
            onClick={() =>
              setSortDirection(sortDirection === "asc" ? "desc" : "asc")
            }
          >
            {sortDirection === "asc" ? "Oldest First" : "Newest First"}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"outline"}>
                <HugeiconsIcon icon={FilterEditIcon} size={4} /> Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="border px-4 py-2 rounded"
              alignOffset={2}
            >
              <DropdownMenuLabel>Filter Tasks</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setFilter("all")}>
                <Checkbox
                  checked={filter === "all"}
                  className={dropdownClass}
                />{" "}
                All Tasks
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("todo")}>
                <Checkbox
                  checked={filter === "todo"}
                  className={dropdownClass}
                />
                To Do
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("inprogress")}>
                <Checkbox
                  checked={filter === "inprogress"}
                  className={dropdownClass}
                />
                In Progress
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("done")}>
                <Checkbox
                  checked={filter === "done"}
                  className={dropdownClass}
                />
                Done
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("archieved")}>
                <Checkbox
                  checked={filter === "archieved"}
                  className={dropdownClass}
                />
                Achieved
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("high")}>
                <Checkbox
                  checked={filter === "high"}
                  className={dropdownClass}
                />
                High
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Input
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md"
      />

      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">List</TabsTrigger>
          <TabsTrigger value="board">Board</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>My Tasks</CardTitle>
              <CardDescription>
                {sortedTasks.length} tasks found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="divider-y">
                {sortedTasks.map((task) => (
                  <div key={task._id} className="p-4 hover:bg-muted/50">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-3">
                      <div className="flex gap-2 ">
                        <div className="py-1">
                          {task.status === "Done" ? (
                            <HugeiconsIcon
                              icon={TickDouble03Icon}
                              className="text-green-500 size-4"
                            />
                          ) : (
                            <HugeiconsIcon
                              icon={Clock01FreeIcons}
                              className="text-primary size-4"
                            />
                          )}
                        </div>

                        <div>
                          <Link
                            to={`/workspaces/${task.project.workspace}/projects/${task.project._id}/task/${task._id}`}
                            className="font-medium hover:text-primary hover:underline transition-colors flex items-center"
                          >
                            {task.title}
                            <ArrowUpRight className="size-4 ml-1" />
                          </Link>

                          <div className="flex items-center space-x-2 mt-1">
                            <Badge
                              className=""
                              variant={
                                task.status === "Done" ? "default" : "outline"
                              }
                            >
                              {task.status}
                            </Badge>

                            {task.priority && (
                              <Badge
                                variant={
                                  task.priority === "High"
                                    ? "destructive"
                                    : "secondary"
                                }
                              >
                                {task.priority}
                              </Badge>
                            )}

                            {true && (
                              <Badge variant={"outline"}>{"Archived"}</Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="text-sm text-muted-foreground space-y-1 text-right">
                        {task.dueDate && (
                          <div>
                            <CalendarDays className="size-4 inline-flex mr-2" />{" "}
                            {format(task.dueDate, "PPPP")}
                          </div>
                        )}

                        <div>
                          <FolderKanban className="size-4 inline-flex mr-2" />
                          <span className="font-medium">
                            {task.project.title}
                          </span>
                        </div>

                        <div>
                          <RefreshCw className="size-4 inline-flex mr-2" />{" "}
                          {format(task.updatedAt, "PPPP")}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {sortedTasks?.length === 0 && (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    No tasks found
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="board">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 select-none">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  To Do
                  <Badge variant={"outline"}>{todoTasks?.length}</Badge>
                </CardTitle>
              </CardHeader>

              <CardContent className="p-3 space-y-3 max-h-[600px] overflow-y-auto">
                {todoTasks.map((task) => (
                  <Card
                    key={task._id}
                    className="hover:shadow-md transition-shadow px-2 "
                  >
                    <Link
                      to={`/workspaces/${task.project.workspace}/projects/${task.project._id}/task/${task._id}`}
                      className="block"
                    >
                      <h3 className="font-medium"> {task.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {task.description || "No description "}
                      </p>

                      <div className="flex items-center mt-2 gap-2">
                        <Badge
                          variant={
                            task.priority === "High"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {task.priority}
                        </Badge>

                        {task.dueDate && (
                          <span className="text-xs text-muted-foreground">
                            {format(task.dueDate, "PPPP")}
                          </span>
                        )}
                      </div>
                    </Link>
                  </Card>
                ))}

                {todoTasks.length === 0 && (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    No tasks found
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  In Progress
                  <Badge variant={"outline"}>{inProgressTasks?.length}</Badge>
                </CardTitle>
              </CardHeader>

              <CardContent className="p-3 space-y-3 max-h-[600px] overflow-y-auto">
                {inProgressTasks.map((task) => (
                  <Card
                    key={task._id}
                    className="hover:shadow-md transition-shadow px-2 "
                  >
                    <Link
                      to={`/workspaces/${task.project.workspace}/projects/${task.project._id}/task/${task._id}`}
                      className="block"
                    >
                      <h3 className="font-medium"> {task.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {task.description || "No description "}
                      </p>

                      <div className="flex items-center mt-2 gap-2">
                        <Badge
                          variant={
                            task.priority === "High"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {task.priority}
                        </Badge>

                        {task.dueDate && (
                          <span className="text-xs text-muted-foreground">
                            {format(task.dueDate, "PPPP")}
                          </span>
                        )}
                      </div>
                    </Link>
                  </Card>
                ))}

                {inProgressTasks.length === 0 && (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    No tasks found
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Done
                  <Badge variant={"outline"}>{doneTasks?.length}</Badge>
                </CardTitle>
              </CardHeader>

              <CardContent className="p-3 space-y-3 max-h-[600px] overflow-y-auto">
                {doneTasks.map((task) => (
                  <Card
                    key={task._id}
                    className="hover:shadow-md transition-shadow px-2 "
                  >
                    <Link
                      to={`/workspaces/${task.project.workspace}/projects/${task.project._id}/task/${task._id}`}
                      className="block"
                    >
                      <h3 className="font-medium"> {task.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {task.description || "No description "}
                      </p>

                      <div className="flex items-center mt-2 gap-2">
                        <Badge
                          variant={
                            task.priority === "High"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {task.priority}
                        </Badge>

                        {task.dueDate && (
                          <span className="text-xs text-muted-foreground">
                            {format(task.dueDate, "PPPP")}
                          </span>
                        )}
                      </div>
                    </Link>
                  </Card>
                ))}

                {doneTasks.length === 0 && (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    No tasks found
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const dropdownClass =
  "data-[state=checked]:border-primary data-[state=checked]:bg-transparent data-[state=checked]:text-white  dark:data-[state=checked]:bg-transparent";

export default MyTasks;
