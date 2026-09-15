const GreenButton = ({ onClick, Label, className = "", type = "button" }) => {
  
  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-xl bg-swamp-green px-5 py-2.5 text-xs font-[PoppinsBold] text-white transition hover:bg-lime-dark ${className}`}
    >
      {Label}
    </button>
  );
};

export default GreenButton;

