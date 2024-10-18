package com.ReelsOrbit.userService.Comments;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class CommentController {

    private final CommentService commentService;

    @PostMapping
    public ResponseEntity<String> addComment(@RequestBody Comment comment) {
        return ResponseEntity.ok(commentService.save(comment));
    }

    @GetMapping("/{movieId}")
    public ResponseEntity<List<Comment>> getCommentsByMovieId(@PathVariable("movieId") Integer movieId){
        return ResponseEntity.ok(commentService.getCommentsByMovieId(movieId));
    }

    @PostMapping("/delete")
    public ResponseEntity<String> deleteComment(@RequestBody Integer commentId) {
        commentService.deleteComment(commentId);
        return ResponseEntity.ok("Comment deleted");
    }
    @PatchMapping("/addLike")
    public ResponseEntity<String> addLikeComment(@RequestBody LikeRequest request) {
        return ResponseEntity.ok(commentService.addLike(request));
    }
}
