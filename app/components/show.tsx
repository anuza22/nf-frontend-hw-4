const ImageShow = (props:any) => {
    return (
        <div className="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
                src={props.src}
                alt="Product Image"
                width="200"
                height="200"
                className="object-cover w-full h-full"
            />
            <button className="items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground absolute top-2 right-2 bg-white/80 dark:bg-gray-950/80 rounded-full w-8 h-8 hidden group-hover:flex">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="w-4 h-4"
                >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                </svg>
                <span className="sr-only">Remove</span>
            </button>
        </div>
    )
}

export default ImageShow;