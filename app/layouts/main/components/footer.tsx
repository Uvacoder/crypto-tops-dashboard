export function Footer() {
  return (
    <footer className="bg-gray-50">
      <div className="container py-3 flex justify-between text-gray-800">
        <p>
          Created By{' '}
          <a href="https://www.github.com/uvacoder">
            uvacoder
          </a>
        </p>

        <p>
          With{' '}
          <a href="https://reactjs.org/" target="_blank" rel="noreferrer">
            React
          </a>
          ,{' '}
          <a href="https://remix.run/" target="_blank" rel="noreferrer">
            Remix
          </a>
          ,{' '}
          <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer">
            TailwindCss
          </a>
          ,{' '}
          <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer">
            Typescript
          </a>
          , and deployed in{' '}
          <a href="https://vercel.com/" target="_blank" rel="noreferrer">
            Vercel
          </a>
        </p>
      </div>
    </footer>
  )
}
