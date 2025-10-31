package cz.vse.menza_api.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class User {
    @JsonIgnore
    private Long id;

    private String username;

    @JsonIgnore
    private String password;

    private Integer balance;

    public User() {}

    public User(Long id, String username, String password, Integer balance) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.balance = balance;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getBalance() {
        return balance;
    }

    public void setBalance(Integer balance) {
        this.balance = balance;
    }


}
