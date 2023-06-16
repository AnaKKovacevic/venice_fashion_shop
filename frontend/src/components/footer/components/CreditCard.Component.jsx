const CreditCardComponent = ({card})=>{
    return(
        <div className="card">
            <img src={card} alt={`${card} logo`} />
        </div>
    );
}

export default CreditCardComponent;