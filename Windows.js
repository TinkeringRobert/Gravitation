module.exports = {
  database: {
    alphaquadrant: 'F:/databases/alphaquadrant.db',
    deltaquadrant: 'F:/databases/deltaquadrant.db',
    starchart: 'F:/databases/starchart.db',
    nodes: 'F:/databases/nodes.db'
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
