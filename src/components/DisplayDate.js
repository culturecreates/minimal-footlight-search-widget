import Moment from "moment/moment" ;

const DisplayDate = (props) => {

return  Moment(props.date).format("DD MMM YY")
}

export default DisplayDate;