module.exports = {
  database: {
      starchart: '/home/automat/Databases/starchart.db',
      nodes: '/home/automat/Databases/nodes.db'
  },
  mqtt: {
    host: 'http://127.0.0.1',
    port: 1883,
    prefix: ''
  },
  udp_server: {
    recv_host: '255.255.255.255',
    recv_port: 33333,
    send_host: '255.255.255.255',
    send_port: 22222
  },
  serial_port: {
    name_port: '/dev/ttyACM0',
    baud_rate: 115200
  },
  server_ip: '10.0.0.100',
  application_port: {
    portal: 80,
    relay_station: 4000,
    star_chart: 4001,
    alpha_quadrant: 4002,
    delta_quadrant: 4003
  }
}
