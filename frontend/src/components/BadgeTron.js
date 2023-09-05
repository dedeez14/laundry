import {Badge} from 'react-bootstrap'
import '../App.css'

const CustomBadge = ({text}) => {
    return (
        <Badge><h1 className='badge-tron'>{text}</h1></Badge>
    )
}

export const BadgeLaundry = () => <CustomBadge text="SELAMAT DATANG" />