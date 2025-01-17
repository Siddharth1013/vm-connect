import SingleDevice from "@/components/SingleDevice"

export default async function page({params}) {
  const id=(await params).id;
  return (
    <SingleDevice id={id}/>
  )
}