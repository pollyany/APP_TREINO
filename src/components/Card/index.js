import '../../styles/components/_card.scss'

export default function Card({children}) {
  return(
    <div className="container-card">
      {children}
    </div>
  )
}