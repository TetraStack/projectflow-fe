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
import {useSearchParams} from "react-router";

import {HugeiconsIcon} from "@hugeicons/react";
import {FilterEditIcon} from "@hugeicons/core-free-icons";
import {Filter} from "lucide-react";
import {Checkbox} from "@/components/ui/checkbox";

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

      
    </div>
  );
};

const dropdownClass =
  "data-[state=checked]:border-primary data-[state=checked]:bg-transparent data-[state=checked]:text-white  dark:data-[state=checked]:bg-transparent";

export default MyTasks;
