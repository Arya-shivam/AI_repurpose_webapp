import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export function useUsageTracking() {
  const { user } = useAuth();
  const [freeUsageCount, setFreeUsageCount] = useState(0);
  const [requiresEmail, setRequiresEmail] = useState(false);
  const [requiresSubscription, setRequiresSubscription] = useState(false);

  useEffect(() => {
    if (user) {
      loadUsageCount();
    } else {
      // For anonymous users, store count in localStorage
      const count = parseInt(localStorage.getItem('freeUsageCount') || '0');
      setFreeUsageCount(count);
      updateRequirements(count);
    }
  }, [user]);

  const loadUsageCount = async () => {
    const { data, error } = await supabase
      .from('usage_tracking')
      .select('usage_count')
      .eq('user_id', user.id)
      .single();

    if (data) {
      setFreeUsageCount(data.usage_count);
      updateRequirements(data.usage_count);
    }
  };

  const updateRequirements = (count: number) => {
    setRequiresEmail(count >= 5);
    setRequiresSubscription(count >= 10);
  };

  const incrementUsage = async () => {
    const newCount = freeUsageCount + 1;

    if (user) {
      await supabase
        .from('usage_tracking')
        .upsert({ user_id: user.id, usage_count: newCount });
    } else {
      localStorage.setItem('freeUsageCount', newCount.toString());
    }

    setFreeUsageCount(newCount);
    updateRequirements(newCount);

    return {
      requiresEmail: newCount >= 5,
      requiresSubscription: newCount >= 10,
    };
  };

  return {
    freeUsageCount,
    requiresEmail,
    requiresSubscription,
    incrementUsage,
  };
}