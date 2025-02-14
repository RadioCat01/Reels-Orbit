package com.RO.ReelsOrbitMonolithic.Role;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByRoleName(String name);
    void deleteByRoleName(String name);
}
