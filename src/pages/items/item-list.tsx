import type React from "react";
import { useContext, useEffect, useMemo, useState } from "react";
import { Button, Loading } from "@/components";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Check,
  Clock,
  Filter,
  MapPin,
  Search,
  Tag,
} from "lucide-react";
import type { FilterType, StatusType } from "@/types";
import { useItems } from "@/hooks/use-items";
import { AuthContext } from "@/context";
import { useMarkAsDone } from "@/hooks/use-mark-as-done";

export const ItemList: React.FC = () => {
  const { data: items, isLoading } = useItems();
  const {user} = useContext(AuthContext)
  const {mutate: markAsDone} = useMarkAsDone()

  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<FilterType>("All");
  const [statusFilter, setStatusFilter] = useState<StatusType>("Active");
  const [showFilters, setShowFilters] = useState(false);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 800);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filteredItems = useMemo(() => {
    if (!items) return [];

    return items.filter((item) => {
      const matchesSearch = item.itemName
        .toLowerCase()
        .includes(debouncedSearchQuery.toLowerCase());
      const matchesType = typeFilter === "All" || item.type === typeFilter;
      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [items, debouncedSearchQuery, typeFilter, statusFilter]);

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-black" />
              <Input
                type="text"
                placeholder="Search items by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="!pl-10 !pr-4 !py-2"
              />
            </div>

            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-start"
            >
              <Filter className="h-5 w-5 text-black" />
              <span className="text-black">Filters</span>
            </Button>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Type
                  </label>
                  <Select
                    value={typeFilter}
                    onValueChange={(value) =>
                      setTypeFilter(value as FilterType)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Types</SelectItem>
                      <SelectItem value="Lost">Lost</SelectItem>
                      <SelectItem value="Found">Found</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Status
                  </label>
                  <Select
                    value={statusFilter}
                    onValueChange={(value) =>
                      setStatusFilter(value as StatusType)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Status</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Done">Done</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {isLoading ? (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
              <Loading />
              <h3 className="text-lg font-medium text-slate-900 mb-2">
                Loading...
              </h3>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
              <Search className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">
                No items found
              </h3>
              <p className="text-slate-600">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        src={item.imageUrl}
                        alt={item.itemName}
                        className="w-20 h-20 rounded-lg object-cover border border-slate-200"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://picsum.photos/id/1/200/300";
                        }}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 mb-1">
                            {item.itemName}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-slate-600 mb-3">
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{item.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>
                                {new Date(item.date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 ">
                            <span
                              className={`flex gap-0.5 items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                item.type === "Lost"
                                  ? "bg-red-500 text-white"
                                  : "bg-green-500 text-white"
                              }`}
                            >
                              <Tag className="h-3 w-3 mr-1" />
                              {item.type}
                            </span>

                            <span
                              className={`flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-medium ${
                                item.status === "Active"
                                  ? "bg-blue-500 text-white"
                                  : "bg-gray-500 text-white"
                              }`}
                            >
                              {item.status === "Active" ? (
                                <Clock className="h-3 w-3 mr-1" />
                              ) : (
                                <Check className="h-3 w-3 mr-1" />
                              )}
                              {item.status}
                            </span>
                          </div>
                        </div>
                        {item.status === "Active" && item.userId === user?.id && (
                          <Button
                            onClick={() => markAsDone(item.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
