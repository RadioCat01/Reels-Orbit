package com.ReelsOrbit.userService.Comments;

public record LikeRequest(
        Integer commentId,
        String userId
) {
}
