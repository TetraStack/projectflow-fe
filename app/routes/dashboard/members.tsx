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
import type {Task, Workspace} from "@/types";
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
import {useGetWorkSpaceDetails} from "@/hooks/use-workspace";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {AvatarImage} from "@radix-ui/react-avatar";

interface Props {}

type FilterOption =
  | "all"
  | "todo"
  | "inprogress"
  | "done"
  | "archieved"
  | "high";

const Members: React.FC<Props> = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initalSearch = searchParams.get("search") || "";

  const [search, setSearch] = useState(initalSearch);

  // console.log("data =====>", myTasks);
  const workspaceId = searchParams.get("workspaceId");

  const {data, isLoading} = useGetWorkSpaceDetails(workspaceId!) as {
    data: Workspace;
    isLoading: boolean;
  };

  const filteredMembers = data?.members?.filter(
    (member) =>
      member.user.name.toLowerCase().includes(search.toLowerCase()) ||
      member.user.email.toLowerCase().includes(search.toLowerCase()) ||
      member.role.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });

    params.search = search;

    setSearchParams(params, {replace: true});
  }, [search]);
  useEffect(() => {
    const urlFilter = searchParams.get("filter") || "all";
    const urlSort = searchParams.get("sort") || "desc";
    const urlSearch = searchParams.get("search") || "";

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
        <h1 className="text-2xl font-bold">Workspace Members</h1>
      </div>

      <Input
        placeholder="Search members..."
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
              <CardTitle>Members</CardTitle>
              <CardDescription>
                {filteredMembers?.length} members found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="divider-y">
                {filteredMembers?.map((member) => (
                  <div
                    key={member.user._id}
                    className="flex flex-col md:flex-row items-center justify-between p-4 gap-3"
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={member.user.profilePicture} />
                        <AvatarFallback className="bg-primary/20">
                          {member.user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <p className="font-medium">{member.user.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {member.user.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 ml-11 md:ml-0">
                      <Badge
                        className="capitalize"
                        variant={
                          ["admin", "owner"].includes(member.role)
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {member.role}
                      </Badge>

                      <Badge variant={"outline"}>{data.name}</Badge>
                    </div>
                  </div>
                ))}

                {filteredMembers?.length === 0 && (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    No tasks found
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="board">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 select-none">
            {filteredMembers.map((member) => (
              <Card key={member.user._id}>
                <CardContent className="p-6 flex flex-col items-center">
                  <Avatar className="size-20 mb-4">
                    <AvatarImage src={member.user.profilePicture} />
                    <AvatarFallback className="bg-primary/20">
                      {member.user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <h3 className="text-lg font-medium mb-2">
                    {member.user.name}
                  </h3>
                  <p className="text-md text-muted-foreground mb-4">
                    {member.user.email}
                  </p>

                  <Badge
                    className="capitalize"
                    variant={
                      ["admin", "owner"].includes(member.role)
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {member.role}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const dropdownClass =
  "data-[state=checked]:border-primary data-[state=checked]:bg-transparent data-[state=checked]:text-white  dark:data-[state=checked]:bg-transparent";

export default Members;
