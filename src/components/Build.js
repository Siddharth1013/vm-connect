import Image from "next/image"

export default function Build() {
  return (
    <>
      <div style={{display:'flex',justifyContent:'center'}}>
          <div><Image src="/startup-life-animate.svg" alt="alt" width={500} height={500} /></div>
      </div>
      <p style={{textAlign:'center',fontSize:'2rem'}}>Page Under Build</p>
    </>
  )
}
