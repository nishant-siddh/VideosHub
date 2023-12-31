import { connect } from "@/dbConfig/dbConfig";
import Video from "@/models/videosModel";

connect();

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const param = searchParams.get("category");

    try {
        let categoryVideo;
        if (param) {
            categoryVideo = await Video.find({ category: param });
        }
        else {
            const distinctCategories = await Video.distinct("category");
            const limitedVideosPerCategory = [];

            for (const category of distinctCategories) {
                if (category !== 'disabledValue') {
                    const videos = await Video.find({ category }).limit(5);
                    limitedVideosPerCategory.push(...videos);
                }
            }

            categoryVideo = limitedVideosPerCategory;
        }
        return new Response(JSON.stringify({ message: "Videos of categories found successfully", videos: categoryVideo }), { status: 200 });
    } catch (error) {
        console.log(error, "error in getting videos of categories");
        return new Response(JSON.stringify({ message: "error in getting videos of categories" }), { status: 500 });
    }

}