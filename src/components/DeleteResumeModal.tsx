'use client';

import { Modal, Button } from './UI';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface DeleteResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  resumeName: string;
}

export default function DeleteResumeModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  resumeName 
}: DeleteResumeModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Resume?"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-red-500/10 border border-red-500/20">
          <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <p className="text-white/80 text-sm leading-relaxed">
              Are you sure you want to delete <span className="font-semibold text-white">"{resumeName}"</span>? 
              This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            variant="ghost" 
            onClick={onClose}
            className="flex-1 py-4"
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={handleDelete}
            className="flex-1 py-4"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Deleting...
              </>
            ) : (
              'Delete Resume'
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
