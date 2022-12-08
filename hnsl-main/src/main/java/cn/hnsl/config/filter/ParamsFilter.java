package cn.hnsl.config.filter;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public class ParamsFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response,
                         FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        String method = (httpServletRequest.getMethod());
        if ("POST".equals(method)) {
            ParameterRequestWrapper parmsRequest = new ParameterRequestWrapper(
                    httpServletRequest);
            chain.doFilter(parmsRequest, response);
        } else {
            chain.doFilter(request, response);
        }

    }

    @Override
    public void init(FilterConfig arg0) throws ServletException {

    }

    @Override
    public void destroy() {

    }

}
