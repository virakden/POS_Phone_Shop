package com.ig.vrrest.configuration

import org.springframework.context.annotation.Configuration
import org.springframework.http.MediaType
import org.springframework.web.servlet.config.annotation.*


@Configuration
@EnableWebMvc
class WebMvcConfigurerAdapter: WebMvcConfigurer {

    val resourcesLocation = arrayOf("classpath:/META-INF/resources/", "classpath:/resources/", "classpath:/public/")

    override fun configureContentNegotiation(configurer: ContentNegotiationConfigurer) {
        configurer.favorParameter(true)
            .defaultContentType(MediaType.APPLICATION_JSON)
            .mediaType("xml", MediaType.APPLICATION_XML)
    }

    override fun addResourceHandlers(registry: ResourceHandlerRegistry) {
        registry.addResourceHandler("/**")
                .addResourceLocations(*resourcesLocation)

//        registry.addResourceHandler("/**")
//                .addResourceLocations("classpath:/static/")
//                .setCacheControl(CacheControl.maxAge(100, TimeUnit.DAYS)) //cached 100 days
    }

    override fun addCorsMappings(registry: CorsRegistry) {
        registry.addMapping("/**")
            .allowedOriginPatterns("*")
            .allowedOrigins("http://localhost:4300", "https://mms-uat.amkcambodia.com")
            .allowedMethods("GET", "POST", "PUT")
            .allowCredentials(false)
    }

    override fun addViewControllers(registry: ViewControllerRegistry) {
        registry.addRedirectViewController("swagger", "/swagger")
        registry.addRedirectViewController("/", "index.html")
    }
}
