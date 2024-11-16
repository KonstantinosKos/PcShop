package com.academic.PcShop.controller;

import com.academic.PcShop.models.WebOrders;
import com.academic.PcShop.models.WebUser;
import com.academic.PcShop.service.webuser.WebUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/webUser")
@RequiredArgsConstructor
public class WebUserController {

    private final WebUserService webUserService;

    @PostMapping
    public ResponseEntity<WebUser> createWebUser(@RequestBody WebUser webUser) {
        return new ResponseEntity<>(webUserService.createWebUser(webUser), HttpStatus.CREATED);
    }

    @PutMapping
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void updateWebUser(@RequestBody WebUser webUser) {
        webUserService.updateWebUser(webUser);
    }

    @GetMapping(params = {"email"})
    public ResponseEntity<WebUser> getWebUserByEmail(@RequestParam String email) {
        return new ResponseEntity<>(webUserService.getWebUSerByEmail(email), HttpStatus.OK);
    }

    @GetMapping(params = {"username"})
    public ResponseEntity<WebUser> getWebUserByUsername(@RequestParam String username) {
        return new ResponseEntity<>(webUserService.getWebUserByUsername(username), HttpStatus.OK);
    }

    @GetMapping(params = {"phoneNumber"})
    public ResponseEntity<WebUser> getWebUserByPhonyNumber(@RequestParam Long phoneNumber) {
        return new ResponseEntity<>(webUserService.getWebUserByPhoneNumber(phoneNumber), HttpStatus.OK);
    }

    @GetMapping(path = "/webOrder/?email",params = {"email"})
    public ResponseEntity<List<WebOrders>> getWebOrdersByEmail (@RequestParam String email) {
        return new ResponseEntity<>(webUserService.getWebOrdersByEmail(email), HttpStatus.OK);
    }

    @GetMapping(path = "/webOrder/?phoneNumber",params = {"phoneNumber"})
    public ResponseEntity<List<WebOrders>> getWebOrdersByPhoneNumber(@RequestParam Long phoneNumber) {
        return new ResponseEntity<>(webUserService.getWebOrderByPhoneNumber(phoneNumber), HttpStatus.OK);
    }

    @GetMapping(path = "/webOrder/?username",params = {"username"})
    public ResponseEntity<List<WebOrders>> getWebOrdersByUsername (@RequestParam String username) {
        return new ResponseEntity<>(webUserService.getWebOrdersByUsername(username), HttpStatus.OK);
    }

    @DeleteMapping
    @ResponseStatus(HttpStatus.OK)
    public void deleteWebUserByUsername(@RequestParam String username) {
        webUserService.deleteWebUserByUsername(username);
    }
}
