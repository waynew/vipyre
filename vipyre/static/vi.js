(function(vi, $, undefined){
    var keys = {
        esc: 27,
        space: 32,
        backspace: 8,
        a: 65,
        h: 104,
        i: 105,
        j: 106,
        k: 107,
        l: 108,
        z: 90,
    };

    vi.editor_el = null;
    vi.mode = 'normal';
    vi.buffer = '';

    function get_caret_pos(){
        return vi.editor_el[0].selectionStart;
    }

    function set_caret_pos(pos){
        vi.editor_el[0].selectionStart = vi.editor_el[0].selectionEnd = pos;
        if(vi.mode == 'normal'){
            vi.editor_el[0].selectionEnd += 1;
        }
    }
    
    function handle_keypress(e){
        var code = e.keyCode || e.which;
        $("#debug").text(code + " " + get_caret_pos());
        if(vi.mode == 'insert'){
            if(code == keys.esc){
                vi.mode = 'normal';
                $('#mode').text('normal');
                e.preventDefault();
            }
        }
        else if (vi.mode == 'normal'){
            if(code == keys.i){
                vi.mode = 'insert';
                $('#mode').text('insert');
            }
            else if(code == keys.h){
                set_caret_pos(get_caret_pos()-1);
            }
            else if(code == keys.l){
                set_caret_pos(get_caret_pos()+1);
            }
            else if(code == keys.j){
                var caret_pos = get_caret_pos();
                var text = vi.editor_el.val();
                var prev_newline = text.lastIndexOf('\n', caret_pos);
                var next_newline = text.indexOf('\n', caret_pos);
                if (next_newline == -1 || next_newline == text.length){
                    // no line after this.
                }
                else {
                    set_caret_pos(next_newline + (caret_pos-prev_newline));
                }
            }
            else if(code == keys.k){
                var caret_pos = get_caret_pos();
                var prev_newline = vi.editor_el.val().lastIndexOf('\n', caret_pos);
                var double_prev_newline = vi.editor_el.val().lastIndexOf('\n', prev_newline-1);
                set_caret_pos(double_prev_newline + (caret_pos-prev_newline));
            }
            e.preventDefault();
            return false;
        }
    }

    vi.redraw = function(){
        vi.editor_el.text(vi.buffer);
    };

    vi.editor = function(selector){
        vi.editor_el = $(selector);
        vi.editor_el.focus();
        set_caret_pos(get_caret_pos())
        $(document).keypress(handle_keypress);
    };

    
        /*
        $('#editor').focus();
        $(document).keyup(function(e){
        });
        */
}(window.vi = window.vi || {}, jQuery));
