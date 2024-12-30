package com.practice.spring.data;

import org.springframework.lang.NonNull;

import org.springframework.lang.Nullable;

public class Response<T> {
    
    public boolean status = false;
    @Nullable
    public final String message;

    @Nullable
    public final T data;

    public Response(boolean status, @Nullable String message, @Nullable T data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }

    public static <T> Response<T> success(
            @Nullable T data,
            String msg,
            boolean status) {
        return new Response<>(status, msg, data);
    }

    public static <T> Response<T> error(
         String msg, 
         @Nullable T data, 
         boolean status ) {
        return new Response<>( status, msg, data);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        Response<?> response = (Response<?>) o;

        if (message != null ? !message.equals(response.message) : response.message != null) {
            return false;
        }
        return data != null ? data.equals(response.data) : response.data == null;
    }

    @Override
    public int hashCode() {
        int result = status? 1: 0;
        result = 31 * result + (message != null ? message.hashCode() : 0);
        result = 31 * result + (data != null ? data.hashCode() : 0);
        return result;
    }

    @NonNull
    @Override
    public String toString() {
        return "Resource{" +
                ", status='" + status + '\'' +
                ", message='" + message + '\'' +
                ", data=" + data +
                '}';
    }
}