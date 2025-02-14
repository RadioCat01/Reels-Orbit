package com.RO.ReelsOrbitMonolithic.Comments;

import com.RO.ReelsOrbitMonolithic.Movie.Movie;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import java.time.LocalDateTime;

@Entity
@Builder
@Data
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "comment")
public class Comment {
    @Id
    @GeneratedValue
    private Integer commentId;

    @NotEmpty(message = "Comment Should not be null")
    @NotNull(message = "Comment Should not be null")
    private String comment;

    private String userEmail;

    private Integer likes;

    @ManyToOne
    @JoinColumn(name = "movie_id", referencedColumnName = "movieId")
    @JsonBackReference("movie-comment")
    private Movie movie;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime lastModifiedDate;
}
