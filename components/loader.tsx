import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

interface LoadingSpinnerProps {
    className?: string;
}

const LoadingSpinner = ({ className }: LoadingSpinnerProps) => (
    <div className={cn(
        "py-20 bg-gray-50",
        className
    )}>
        <div className="flex h-full items-center justify-center">
            <Loader className="animate-spin" />
        </div>
    </div>
)

export default LoadingSpinner;