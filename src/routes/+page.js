// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
import video_1 from "../lib/videos/video_1.mp4";
import video_2 from "../lib/videos/video_2.mp4";
import video_3 from "../lib/videos/video_3.mp4";
import video_4 from "../lib/videos/video_4.mp4";
import video_5 from "../lib/videos/video_5.mp4";
import video_6 from "../lib/videos/video_6.mp4";
import video_7 from "../lib/videos/video_7.mp4";
import video_8 from "../lib/videos/video_8.mp4";
import video_9 from "../lib/videos/video_9.mp4";
import video_10 from "../lib/videos/video_10.mp4";

/**
 * @name load
 * @author Shuvethram Ayyasamy Ragupathy
 * @date 4th wednesday 2023
 * @returns Array[] of Video URLs
 */
export function load() {
    return {
        videos: [video_1, video_2, video_3, video_4,video_5, video_6, video_7, video_8, video_9, video_10]
    }
}
export const prerender = true;

