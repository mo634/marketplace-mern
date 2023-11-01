const Singin = () => {
    return (
        <section className=" p-10 flex flex-col items-center justify-center">
            <h1 className=" text-2xl mb-3 text-parg-color">Sign In</h1>
            <form className=" flex flex-col gap-5 w-[50%] max-w-lg ">
                <input
                    type="email"
                    placeholder=" Email"
                    className="input_field"
                />
          <input type="password"
            placeholder=" password"
          className="input_field"
          />
          <button
          className="main_btn"
          >singn in </button>
          <button
          className="main_btn !bg-[#03a9f4]"
          >continue with google</button>
            </form>

        <div className=" mt-3 flex gap-2">
        <p className=" text-parg-color">have an account</p>
        <a href="#">sing in</a>
        </div>
        </section>
    );
};

export default Singin;
