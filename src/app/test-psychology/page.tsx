import { TestSelection } from "@/components/test-selection"

export default function TestPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-3">Your Psychological Analysis Test</h1>
      <p className="text-center text-muted-foreground mb-7">Answer these questions with Yes or No</p>
      <TestSelection />
    </div>
  )
}

