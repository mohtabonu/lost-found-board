import React from "react";
import { LoaderCircle } from "lucide-react";

export const Loading: React.FC = () => (
	<div className="flex justify-center items-center h-full">
		<LoaderCircle className="-ms-1 animate-spin text-slate-600" size={50} aria-hidden="true" />
	</div>
);
