import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import toast, { Toaster } from 'react-hot-toast';
import {
  Upload,
  FileText,
  Mail,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { AuthPage } from './components/AuthPage';
import { useAuth } from './hooks/useAuth';
import { useUsageTracking } from './hooks/useUsageTracking';
import { transformContent } from './lib/ai';

type ContentFormat = 'social' | 'newsletter' | 'infographic';
type ContentType = 'text' | 'video';
type ProcessingStatus = 'idle' | 'processing' | 'complete' | 'error';

interface ContentState {
  type: ContentType;
  content: string;
  selectedFormat: ContentFormat;
  processedContent: string;
  status: ProcessingStatus;
}

export default function App() {
  const { user } = useAuth();
  const { freeUsageCount, requiresEmail } = useUsageTracking();
  const [showAuth, setShowAuth] = useState<'signin' | 'signup' | null>(null);
  const [email, setEmail] = useState('');
  const [content, setContent] = useState<ContentState>({
    type: 'text',
    content: '',
    selectedFormat: 'social',
    processedContent: '',
    status: 'idle'
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    
    reader.onload = () => {
      setContent(prev => ({
        ...prev,
        content: reader.result as string,
        type: file.type.includes('video') ? 'video' : 'text'
      }));
    };
    
    reader.readAsText(file);
    toast.success('File uploaded successfully!');
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/*': ['.txt', '.md'],
      'application/json': ['.json'],
    },
    maxSize: 5242880, // 5MB
  });

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(prev => ({ ...prev, content: e.target.value }));
  };

  const handleFormatChange = (format: ContentFormat) => {
    setContent(prev => ({ ...prev, selectedFormat: format }));
  };

  const processContent = async () => {
    try {
      setContent(prev => ({ ...prev, status: 'processing' }));
      
      const result = await transformContent(
        content.content,
        content.selectedFormat
      );
      
      setContent(prev => ({
        ...prev,
        processedContent: result.content,
        status: 'complete'
      }));
      
      toast.success('Content processed successfully!');
    } catch (error) {
      setContent(prev => ({ ...prev, status: 'error' }));
      toast.error('Error processing content');
    }
  };

  const handleAuthClick = (mode: 'signin' | 'signup') => {
    setShowAuth(mode);
  };

  if (showAuth) {
    return <AuthPage mode={showAuth} onBack={() => setShowAuth(null)} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Navbar onAuthClick={handleAuthClick} />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            Transform Your Content with AI
          </h1>
          <p className="text-lg text-gray-400">
            Instantly repurpose your content for different platforms
          </p>
        </div>

        <div className="backdrop-blur-lg bg-gray-800/50 rounded-xl shadow-lg shadow-purple-500/10 border border-gray-700/50 p-6 mb-8">
          <div {...getRootProps()} className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-purple-500 transition-colors">
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            {isDragActive ? (
              <p className="text-gray-300">Drop your content here...</p>
            ) : (
              <p className="text-gray-300">Drag & drop your content here, or click to select</p>
            )}
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Or paste your content here:
            </label>
            <textarea
              value={content.content}
              onChange={handleContentChange}
              className="w-full h-32 p-3 bg-gray-700/50 border border-gray-600 rounded-md focus:ring-purple-500 focus:border-purple-500 text-gray-100 placeholder-gray-400"
              placeholder="Enter your content here..."
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Select output format:
            </label>
            <div className="grid grid-cols-3 gap-4">
              {(['social', 'newsletter', 'infographic'] as ContentFormat[]).map((format) => (
                <button
                  key={format}
                  onClick={() => handleFormatChange(format)}
                  className={`p-4 rounded-lg border ${
                    content.selectedFormat === format
                      ? 'border-purple-500 bg-purple-500/20 text-purple-300'
                      : 'border-gray-600 hover:border-purple-500 hover:bg-purple-500/10'
                  } transition-all duration-200`}
                >
                  <FileText className="h-6 w-6 mx-auto mb-2" />
                  <span className="block text-sm capitalize">{format}</span>
                </button>
              ))}
            </div>
          </div>

          {requiresEmail && !user && (
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Enter your email to continue:
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-md focus:ring-purple-500 focus:border-purple-500 text-gray-100 placeholder-gray-400"
                placeholder="your@email.com"
              />
            </div>
          )}

          <button
            onClick={processContent}
            disabled={!content.content || content.status === 'processing'}
            className="mt-6 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-3 px-4 rounded-md hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all duration-200"
          >
            {content.status === 'processing' ? (
              <>
                <Sparkles className="animate-spin h-5 w-5" />
                Processing...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                Transform Content
              </>
            )}
          </button>
        </div>

        {content.status === 'complete' && (
          <div className="backdrop-blur-lg bg-gray-800/50 rounded-xl shadow-lg shadow-purple-500/10 border border-gray-700/50 p-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="h-6 w-6 text-green-400" />
              <h2 className="text-xl font-semibold text-gray-100">
                Transformed Content
              </h2>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4">
              <pre className="whitespace-pre-wrap text-gray-300">{content.processedContent}</pre>
            </div>
          </div>
        )}
      </main>
      
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#1f2937',
            color: '#fff',
            borderRadius: '0.5rem',
            border: '1px solid rgba(107, 114, 128, 0.5)',
          },
        }}
      />
    </div>
  );
}