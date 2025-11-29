use winit::{
    event::{Event, WindowEvent},
    event_loop::{ControlFlow, EventLoop},
    window::Window,  // 注意：导入 Window，不是 WindowBuilder
};

fn main() {
    let event_loop = EventLoop::new().unwrap();
    event_loop.set_control_flow(ControlFlow::Wait);

    // 新 API：用 Window::default_attributes() 替换 WindowBuilder::new()
    let window_attributes = Window::default_attributes()
        .with_title("winit 0.30.12 - 无 WindowBuilder 示例")
        .with_inner_size(winit::dpi::LogicalSize::new(800, 600));

    let window = event_loop
        .create_window(window_attributes)  // 直接用 create_window
        .unwrap();

    event_loop.run(move |event, elwt| {
        elwt.set_control_flow(ControlFlow::Wait);

        match event {
            Event::WindowEvent {
                event: WindowEvent::CloseRequested,
                window_id,
            } if window_id == window.id() => elwt.exit(),
            _ => {}
        }
    }).unwrap();
}