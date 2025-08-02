import type React from "react";
import { Plus, X, Package} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui";

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isOnAddPage = location.pathname === "/add";

  const handleClick = () => {
    const nextPath = isOnAddPage ? "/" : "/add";
    navigate(nextPath);
  };

  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="p-2 rounded-full border-2 border-black">
              <Package className="h-6 w-6 text-black" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-black">Lost & Found</h1>
              <p className="text-sm text-gray-600">Airport Terminal Hub</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={handleClick}
              className="flex items-center cursor-pointer"
            >
              {!isOnAddPage ? (
                <>
                  <Plus className="h-4 w-4" />
                  <span>Report Item</span>
                </>
              ) : (
                <>
                  <X className="h-4 w-4" />
                  <span>Back to List</span>
                </>
              )}
            </Button>
           
          </div>
        </div>
      </div>
    </header>
  );
};
