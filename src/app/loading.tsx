import { Loader2 } from "lucide-react"

const Loading = () => {
  return (
    <div className="flex justify-center">
      <Loader2 className="w-8 h-8 text-gray-300 md:h-12 md:w-12 animate-spin" />
    </div>
  )
}

export default Loading;