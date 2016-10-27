/*!
 * Brackets add/remove php tag 1.0
 * Add/remove php tag without using your keyboard
 *
 * @author Bajai Károly
 * @license none - steal this software!
 */
define( function( require, exports, module ) {
    'use strict';
    var AppInit = brackets.getModule( 'utils/AppInit' ),
        Document = brackets.getModule( 'document/Document' ),
        Editor = brackets.getModule( 'editor/Editor' ),
        EditorManager = brackets.getModule( 'editor/EditorManager' ),
        CommandManager = brackets.getModule( 'command/CommandManager' ),
        Commands = brackets.getModule( 'command/Commands' ),
        ExtensionUtils = brackets.getModule( 'utils/ExtensionUtils' ),
        $todoIcon = $( '<a href="#" title="Add/remove php tag to/from selection." id="php-tag"></a>' );
    
    ExtensionUtils.loadStyleSheet( module, 'php-tag.css' );

    // Register extension.
    CommandManager.register( "Add / Remove php tag", "com.divid.php-tag.docomment", doComment );
    
    function doComment(){
        var ed = EditorManager.getCurrentFullEditor();
        var selection = ed.getSelection(), doc = ed.document,r;
        if((selection.start.line == selection.end.line) && (selection.start.ch == selection.end.ch)){//no current selection
            return;   
        }
        if((ed.getSelectedText().trim().indexOf("<?php ") == 0) && (ed.getSelectedText().trim().lastIndexOf(" ?>") == (ed.getSelectedText().trim().length-2))){//remove an existing comment
            r=ed.getSelectedText().substring(ed.getSelectedText().indexOf("<?php ")+2, ed.getSelectedText().lastIndexOf(" ?>"));
            doc.replaceRange(r, selection.start, selection.end);
        }else{
            doc.replaceRange("<?php "+ed.getSelectedText()+" ?>", selection.start, selection.end);
        }
    }
    
    AppInit.appReady( function() {

        // Add listener for toolbar icon..
        $todoIcon.click( function() {
            CommandManager.execute( "com.divid.php-tag.docomment" );
        } ).appendTo( '#main-toolbar .buttons' );

    } );
});