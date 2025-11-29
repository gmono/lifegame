// 全屏 quad vertex shader（基于官方 examples）
@vertex
fn vs_main(@builtin(vertex_index) in_vertex_index: u32) -> @builtin(position) vec4<f32> {
    var p = vec2<f32>(0.0, 0.0);
    p.x = f32((in_vertex_index << 1u) & 2u) - 1.0;
    p.y = f32(in_vertex_index & 1u) * 4.0 - 1.0;
    return vec4<f32>(p, 0.0, 1.0);
}

// Fragment shader：简单能量模拟（高亮中心，渐变颜色）
@fragment
fn fs_main(@builtin(position) in_pos: vec4<f32>) -> @location(0) vec4<f32> {
    let dist = length(in_pos.xy - vec2<f32>(400.0, 300.0));  // 中心距离
    let energy = 1.0 - smoothstep(0.0, 400.0, dist);  // 简单“扩散”模拟
    return vec4<f32>(energy, energy * 0.5, 1.0 - energy, 1.0);  // RGB 渐变
}