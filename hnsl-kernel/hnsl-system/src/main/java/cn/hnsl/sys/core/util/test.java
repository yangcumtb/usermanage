package cn.hnsl.sys.core.util;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class test {
    public static void main(String[] args) {

        User x = new User("x", 11,"男");
        User y = new User("y", 12,"男");
        User w = new User("w", 10,"女");

        Map<String, List<User>> groupMap = Stream.of(w, x, y).collect(Collectors.groupingBy(User::getSex));

    }

    static class User {

        private String name;

        private int age;

        private String sex;

        public User(String name, int age, String sex) {
            this.name = name;
            this.age = age;
            this.sex = sex;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public int getAge() {
            return age;
        }

        public void setAge(int age) {
            this.age = age;
        }

        public String getSex() {
            return sex;
        }

        public void setSex(String sex) {
            this.sex = sex;
        }

        @Override
        public String toString() {
            return "User{" +
                    "name='" + name + '\'' +
                    ", age=" + age +
                    '}';
        }
    }
}
