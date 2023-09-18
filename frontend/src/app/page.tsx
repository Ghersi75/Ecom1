async function getSections() {
  const res = await fetch("http://localhost:3333/menu/section/", {
    method: "GET",
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    return null
    // throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

export default async function Home() {
  const sections = await getSections()

  console.log(sections)

  return (
    <main className="">
      Test
    </main>
  )
}
