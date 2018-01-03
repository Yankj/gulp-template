location / {
	alias /opt/src/app/;
	expires 24h;
}

location ^~ /backend/ {
    proxy_set_header Host server_backend1;
    proxy_set_header Origin http://server_backend1;
    proxy_pass    http://server_backend1/;
    client_max_body_size 51m;
    client_body_buffer_size 1024k;
}