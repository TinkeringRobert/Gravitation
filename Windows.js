module.exports = {
  database: {
    database_postfix: '_windows',
    username: 'root',
    password: 'f3e32c78146eed563ce105a318ec5dc0b3363b770ae576f3df8068a4a7178cdee17f3d0717a8a6f3b948edd8c13c0eb9QX4Ro+TL79JFgi79yh02Zg==',
    hostaddress: '10.0.0.200',
    alphaquadrant: 'alpha_quadrant',
    deltaquadrant: 'delta_quadrant',
    starchart: 'star_chart',
    relaystation: 'relay_station'
  },
  mqtt: {
    host: 'http://10.0.0.200',
    port: 1883,
    prefix: 'windows_'
  },
  udp_server: {
    recv_host: '0.0.0.0',
    recv_port: 33333,
    send_host: '255.255.255.255',
    send_port: 22222
  },
  serial_port: {
    name_port: 'COM7',
    baud_rate: 9600
  },
  server_ip: '10.0.0.9',
  application_port: {
    wormhole: 4200,
    gravitation: 3000,
    relay_station: 4000,
    star_chart: 4001,
    alpha_quadrant: 4002,
    delta_quadrant: 4003,
    time_distortion: 4004
  },
  applications: [
    {name: "wormhole", port: 4200},
    {name: "gravitation", port: 3000},
    {name: "relay_station", port: 4000},
    {name: "star_chart", port: 4001},
    {name: "alpha_quadrant", port: 4002},
    {name: "delta_quadrant", port: 4003},
    {name: "time_distortion", port: 4004}
  ]
}
