    //==UTILTY FUNCTIONS============
    //--Functions shared across the App
    
    
    //--Capitalize Word
    export const capitalizeWord = word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    //--Gives list of available category names
    export const getCategories = () => {
        return [
            "General Knowledge",
            "Books",
            "Film",
            "Music",
            "Musicals & Theatres",
            "Television",
            "Video Games",
            "Board Games",
            "Science & Nature",
            "Computers",
            "Mathematics",
            "Mythology",
            "Sports",
            "Geography",
            "History",
            "Politics",
            "Art",
            "Celebrities",
            "Animals",
            "Vehicles",
            "Comics",
            "Gadgets",
            "Anime & Manga",
            "Cartoon & Animations"
        ];
    }