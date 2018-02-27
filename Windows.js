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
    host: 'http://10.0.0.100',
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
    name_port: 'COM5',
    baud_rate: 115200
  },
  server_ip: '10.0.0.101',
  application_port: {
    portal: 8080,
    relay_station: 4000,
    star_chart: 4001,
    alpha_quadrant: 4002,
    delta_quadrant: 4003
  }
}
