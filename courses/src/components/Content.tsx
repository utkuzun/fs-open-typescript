import React from 'react'

interface Part {
  name: string
  exerciseCount: number
}

const Content = ({ courseParts }: { courseParts: Part[] }) => {
  if (courseParts.length <= 0) {
    return null
  }

  return (
    <div>
      {courseParts.map((part) => (
        <p key={part.name}>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </div>
  )
}

export default Content
