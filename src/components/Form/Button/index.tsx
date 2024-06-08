interface ButtonProps{
    label:string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    bgColor?:string;
    type?: 'submit' | 'button';
    loading:boolean;
    theClass?:string;
}

const Button: React.FC<ButtonProps> = ({
    label,
    type,
    onClick,
    bgColor,
    loading
}) => {
    return ( 
        <>
            <button className={`bg-primary rounded-lg m-3 p-4 px-9 hover:bg-yellow-900 hover:text-white w-3/5 text-black`} 
                onClick={onClick}
                type={type || 'submit'}
                disabled={loading}
            >
                {loading ? (
                   <div className="flex justify-center"><div className="mx-4 mb-1">{label}</div><div className={`animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full`}></div></div>
                    ): (
                        <div className="text-sm font-semibold">
                            {label}
                        </div>
                    )}

            </button>


        
        </>
     );
}
 
export default Button;