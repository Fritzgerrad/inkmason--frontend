export default function AuthLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
    <>
        <div className="bg-white">
            <div className="flex">
                <div>

                </div>
                <div className=" w-4/5 lg:w-2/5 flex justify-center">
                    <div className="p-5 w-full">
                        {children}
                    </div>
                </div>

            </div>

        </div>
    
    </> 
    );
}
 
